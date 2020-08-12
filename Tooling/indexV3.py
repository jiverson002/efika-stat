import sys

'''print ("The script has the name %s" % (sys.argv[1]))'''

dataStart = 127
dataEnd = 142
#name of input/output file on cmd line arg ***
dataFile = "perf3.out"

# "x" to create, "a" to append, "w" to write
file = open("data.json", "w")
# Start of the JSON file
file.write("{\n")
# Start of the layout of the JSON file
file.write("\"layout\": {\n")
# Title of the graph
file.write("\"title\": \"")
file.write(sys.argv[1] + "\",\n")
# Formatting and title for the x-axis
file.write("\"xaxis\": {\n")
file.write("\"type\": \"Date\",\n")
file.write("\"title\": \"")
file.write(sys.argv[2] + "\" \n")
file.write("},\n")
# Formatting and title for the y axis
file.write("\"yaxis\": {\n")
file.write("\"title\": \"")
file.write(sys.argv[3] + "\" \n")
file.write("}\n")
# End of the Layout section
file.write("},\n")
# Start of the Trace section
file.write("\"traces\": [\n")
i = 0
while i < 6:
    # Start of the first trace
    file.write("{\n")
    file.write("\"x\":[")
    xvals = []
    f = open(dataFile, "r")
    for x in f:
        #datetime obj ***
        if "@date:" in x:
            # x[11:31]
            data = x[27:31]
            if "Jan" in x:
                data = data + "-01"
            elif "Feb" in x:
                data = data + "-02"
            elif "Mar" in x:
                data = data + "-03"
            elif "Apr" in x:
                data = data + "-04"
            elif "May" in x:
                data = data + "-05"
            elif "Jun" in x:
                data = data + "-06"
            elif "Jul" in x:
                data = data + "-07"
            elif "Aug" in x:
                data = data + "-08"
            elif "Sep" in x:
                data = data + "-09"
            elif "Oct" in x:
                data = data + "-10"
            elif "Nov" in x:
                data = data + "-11"
            else:
                data = data + "-12"
            data = data + "-" + x[15:18] + " " + x[18:27]
            xvals.append(data)
    f.close()
    for x in xvals:
        if x == xvals[len(xvals) - 1]:
            file.write("\"" + x + "\"")
        else:
            file.write("\"" + x + "\"" + ",")
    file.write("],\n")
    # end of xvals for first dataset

    # Start of yvals for first data set
    file.write("\"y\":[")
    yvals = []
    f = open(dataFile, "r")
    for x in f:
        x = x[dataStart:dataEnd].replace(" ", "")
        test = x
        if test.replace('.', '', 1).isdigit():
            yvals.append(x)
    #f.rewind() ***
    f.close()
    index = 0
    for x in yvals:
        if index == len(yvals) - 1:
            file.write("\"" + x + "\"")
        else:
            file.write("\"" + x + "\"" + ",")
        index += 1
    file.write("],\n")
    # end of yvals for first data set

    # last touches of trace including: name, type, and text for each plot
    file.write("\"name\":\"")
    f = open(dataFile, "r")
    for x in f:
        x = x[dataStart:dataEnd]
        if isinstance(x, str) and x != "":
            file.write(x)
            break
    f.close()
    file.write("\",\n")
    # end of title
    file.write("\"type\":\"scatter\",\n")
    # end of type
    hashes = []
    file.write("\"text\": [")
    f = open(dataFile, "r")
    for x in f:
        if "@commit" in x:
            hashes.append(x[8:48])
    f.close()
    for x in hashes:
        if x == hashes[len(hashes) - 1]:
            file.write("\"" + x + "\"")
        else:
            file.write("\"" + x + "\"" + ",")
    file.write("]\n")
    dataStart += 18
    dataEnd += 18
    # end of text for each data point
    if i == 5:
        file.write("}\n")
    else:
        file.write("},\n")
    # end of trace object
    i += 1

file.write("]\n")
# end of trace array

file.write("}\n")
file.close()
# end of file
