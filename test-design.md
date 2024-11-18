## Testing Design Report


## PDF Parsing

The PDF parsing is currently tested manually. A PDF is input, and using print statements to log to the console, we are able to check that the output is correctly parsed and split.

This testing revealed that PDFs are much harder to effectively parse than we originally thought. The formatting of the document does not necessarily provide any useful information about how comments are broken up or where things are located. Through testing and tweaking our code, however, we were able to effectively cut out unnecessary data from the PDFs and parse the useful comments out of their respective sections into an array to feed our AI.
