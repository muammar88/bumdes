const { sequelize, Cerita_kami, Usaha } = require("../db/models");

const { promises } = require("fs");

const helper = {};

helper.generate_slug = async (value) => {
  var splitText = value.split(" ");
  var newText = "";
  for (x = 0; x <= splitText.length; x++) {
    if (splitText[x] != undefined) {
      newText = newText + "-" + splitText[x];
    }
  }

  let condition = true;
  let i = 0;
  var returnText = "";
  while (condition) {
    if (i != 0) {
      returnText = newText;
    } else {
      returnText = newText + "-" + i;
    }
    check = await Cerita_kami.findOne({ where: { path: returnText } });
    if (!check) {
      condition = false;
    }
    i++;
  }

  return returnText;
};

helper.generate_slug_usaha = async (value) => {
  var splitText = value.split(" ");
  var newText = "";
  for (x = 0; x <= splitText.length; x++) {
    if (splitText[x] != undefined) {
      newText = newText + "-" + splitText[x];
    }
  }

  let condition = true;
  let i = 0;
  var returnText = "";
  while (condition) {
    if (i != 0) {
      returnText = newText;
    } else {
      returnText = newText + "-" + i;
    }
    check = await Usaha.findOne({ where: { path: returnText } });
    if (!check) {
      condition = false;
    }
    i++;
  }

  return returnText;
};

// helper.checkTagId = async (value) => {
//   check = await Tag.findOne({ where: { id: value } });
//   if (!check) {
//     return false;
//   }
//   return true;
// };

// helper.objectLength = async (object) => {
//   return Object.keys(object).length;
// };

// helper.fileExists = async (path) =>
//   !!(await promises.stat(path).catch((e) => false));

// helper.text_limit = async (element, lenght) => {
//   var new_text = "";
//   var textElement = element.split(" ");

//   if (lenght == undefined) lenght = 10;

//   for (let index = 0; index < lenght; index++) {
//     new_text = new_text + " " + textElement[index];
//   }

//   return new_text.trim() + "...";
// };
// helper.appendTextNodes = async (element) => {
//     var text = '';

//     // Loop through the childNodes of the passed in element
//     for (var i = 0, len = element.childNodes.length; i < len; i++) {
//         // Get a reference to the current child
//         var node = element.childNodes[i];
//         // Append the node's value if it's a text node
//         if (node.nodeType == 3) {
//             text += node.nodeValue;
//         }
//         // Recurse through the node's children, if there are any
//         if (node.childNodes.length > 0) {
//             appendTextNodes(node);
//         }
//     }
//     // Return the final result
//     return text;
// }

module.exports = helper;
