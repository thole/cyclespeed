#https://mapzen.com/metro-extracts/
default: speed.csv

speed.csv: 
	echo "x,y,s" > speed.csv
	node parser.js >> speed.csv

clean:
	rm -f hamburg.json
	rm -f speed.csv

delete: 
	rm -f cycling.gpx

