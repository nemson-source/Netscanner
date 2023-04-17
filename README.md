# open-netscan
This is a simple node.js newtwork scanner that will loock for responding ip's and open ports

Step 1: Download the Release
Download the latest release of the net scanner from the GitHub repository. You can usually find the release files in a zip format. Once the download is complete, unzip the release files to a directory of your choice.

Step 2: Install Required Libraries
Open a command prompt or terminal window and navigate to the directory where you extracted the release files. Run the following commands to install the required libraries: ``
npm install net
npm install fs
npm install ping
npm install readline
``
These commands will install the necessary Node.js libraries (net, fs, ping, and readline) that the net scanner relies on.

Step 3: Start the Scan
Run the scan.bat file in the release folder. This will start the Node.js program and prompt you to enter the start and end IP addresses for the scan range. You can enter the IP addresses in the format of xxx.xxx.xxx.xxx, where xxx represents the octets of the IP address.

Next, you will be prompted to enter the start and end port numbers for the scan range. You can enter the port numbers as integers, representing the range of ports you want to scan.

Step 4: View the Results
Once the scan is complete, the program will create several output files in the release folder:

responding.txt: This file will contain the IP addresses of the hosts that responded to the scan.
openport.json: This file will contain information about the open ports on the responding hosts in JSON format.
nonresponding.txt: This file will contain the IP addresses of the hosts that did not respond to the scan.
log.txt: This file will contain a log of the scan process.
You can open and view these files to see the results of the net scan.
