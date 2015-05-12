#https://mapzen.com/metro-extracts/
default: extract speed.csv

speed.csv: 
	echo "x,y,s" > speed.csv
	node parser.js >> speed.csv

clean:
	rm -f speed.csv
	rm -f -r ./temp

delete: 
	rm -f moves_export.zip
	rm -f -r ./temp

extract: moves_export.zip
	unzip moves_export.zip -d ./temp
	unzip ./temp/gpx.zip -d ./temp
