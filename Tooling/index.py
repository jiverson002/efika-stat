import sys
import datetime

'''print ("The script has the name %s" % (sys.argv[1]))'''

#Variables from cmd line
title = sys.argv[1]
xaxisTitle = sys.argv[2]
yaxisTitle = sys.argv[3]
dataFile = sys.argv[4]
fileToPrintTo = sys.argv[5]

#Start of columns with data in them
dataStart = 127 # +18 every loop to get to next set of data
dataEnd = 142 # +18 every loop to get to next set of data

# "x" to create, "a" to append, "w" to write
file = open(fileToPrintTo, "w")

# Start of the JSON file
file.write("{\n")

# Start of the layout of the JSON file
file.write("\"layout\": {\n")

# Title of the graph
file.write("\"title\": \"")
file.write(title + "\",\n")

# Formatting and title for the x-axis
file.write("\"xaxis\": {\n")
file.write("\"type\": \"Date\",\n")
file.write("\"title\": \"")
file.write(xaxisTitle + "\" \n")
file.write("},\n")

# Formatting and title for the y axis
file.write("\"yaxis\": {\n")
file.write("\"title\": \"")
file.write(yaxisTitle + "\" \n")
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
        if "@date:" in x:
            # x[11:31], this does not include the timezone,
            # this converts data to datetime and prints out to datafile in proper form
            my_date = datetime.datetime.strptime(x[7:31], "%c")
            xvals.append(my_date.strftime("%Y") + "-" + my_date.strftime("%m") + "-" + my_date.strftime("%d") + " " + my_date.strftime("%X"))
    f.seek(0)
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
    for x in f:
        x = x[dataStart:dataEnd].replace(" ", "")
        test = x
        if test.replace('.', '', 1).isdigit():
            yvals.append(x)
    f.seek(0)
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
    for x in f:
        x = x[dataStart:dataEnd]
        if isinstance(x, str) and x != "":
            file.write(x)
            break
    f.seek(0)
    file.write("\",\n")
    # end of title

    file.write("\"type\":\"scatter\",\n")
    # end of type

    hashes = []
    file.write("\"text\": [")
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
