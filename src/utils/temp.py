import json

f = open('m.txt', "r")

list = []

for line in f:
    element = line.split(",")
    list.append(element[0])
    #     line = line.replace('\n', '')
    
json_str = json.dumps(list)
print(json_str)