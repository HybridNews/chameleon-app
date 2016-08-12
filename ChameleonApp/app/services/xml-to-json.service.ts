import {Class} from '@angular/core';

interface WindowX extends Window {
	ActiveXObject;
	DOMParser;
}

// based on http://stackoverflow.com/questions/1199180/read-xml-file-using-javascript
export class XmlToJsonService {
	constructor() {
	}

	getJson(xml) {
		if (typeof xml == 'string') {
			try {
				if ((<WindowX>window).DOMParser)
					xml = (new DOMParser()).parseFromString(xml, "application/xml");
				else if ((<WindowX>window).ActiveXObject) {
					var xmlObject = new ActiveXObject("Microsoft.XMLDOM");
					xmlObject.async = false;
					xmlObject.loadXML(xml);
					xml = xmlObject;
					xmlObject = undefined;
				}
				else
					throw new Error("Cannot find an XML parser!");
			}
			catch (error) {
				return false;
			}
		}

		var result = {};

		if (xml.nodeType == 9)
			xml = xml.firstChild;

		xml = xml.firstChild;

		while (xml) {
			if (xml.childNodes.length) {
				if (xml.tagName in result) {
					if (result[xml.tagName].constructor != Array)
						result[xml.tagName] = [result[xml.tagName]];
					result[xml.tagName].push(this.getJson(xml));
				}
				else
					result[xml.tagName] = this.getJson(xml);
			} else if (xml.tagName)
				result[xml.tagName] = xml.nodeValue;
			else if (!xml.nextSibling) {
				var cleanedNode = xml.nodeValue.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "");
				if (cleanedNode != "") {
					result = cleanedNode;
				}
			}
			xml = xml.nextSibling;
		}
		return result;
	}
}