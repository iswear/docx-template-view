export const data = [
  {
    "schema": "XML",
    "htmlType": "ignore",
    "javaType": "org.docx4j.wml.Body@504538534",
    "children": [
      {
        "schema": "XML",
        "htmlType": "p",
        "javaType": "org.docx4j.wml.P@2079229473",
        "children": [
          {
            "schema": "XML",
            "htmlType": "span",
            "javaType": "org.docx4j.wml.R@1215795615",
            "children": [
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.Text@1765165869",
                "children": [],
                "text": "For i start"
              }
            ]
          }
        ]
      },
      {
        "schema": "STMT",
        "stmtType": "for",
        "preExprList": [
          {
            "kind": "expr:declare-variable",
            "declares": [
              {
                "variable": {
                  "kind": "expr:variable",
                  "identifier": "i"
                },
                "value": {
                  "kind": "expr:const-integer",
                  "value": 0
                }
              }
            ]
          }
        ],
        "test": {
          "kind": "expr:relational",
          "leftSide": {
            "kind": "expr:variable",
            "identifier": "i"
          },
          "operator": "<",
          "rightSide": {
            "kind": "expr:const-integer",
            "value": 100
          }
        },
        "postExprList": [
          {
            "kind": "expr:prefix-increment",
            "target": {
              "kind": "expr:variable",
              "identifier": "i"
            }
          }
        ],
        "children": [
          {
            "schema": "XML",
            "htmlType": "p",
            "javaType": "org.docx4j.wml.P@2079229473",
            "children": [
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.R@1541298091",
                "children": [
                  {
                    "schema": "XML",
                    "htmlType": "span",
                    "javaType": "org.docx4j.wml.Text@15335646",
                    "children": [],
                    "text": "for i in start"
                  }
                ]
              }
            ]
          },
          {
            "schema": "XML",
            "htmlType": "p",
            "javaType": "org.docx4j.wml.P@37528429",
            "children": [
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.R@1391890442",
                "children": [
                  {
                    "schema": "STMT",
                    "stmtType": "expr",
                    "expr": {
                      "kind": "expr:function-call",
                      "optional": false,
                      "function": "interpolate",
                      "args": [
                        {
                          "kind": "expr:variable",
                          "identifier": "i"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.R@729867689",
                "children": [
                  {
                    "schema": "XML",
                    "htmlType": "span",
                    "javaType": "org.docx4j.wml.Text@1287658623",
                    "children": [],
                    "text": "for i in center"
                  }
                ]
              }
            ]
          },
          {
            "schema": "XML",
            "htmlType": "p",
            "javaType": "org.docx4j.wml.P@449240381",
            "children": [
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.R@1445534206",
                "children": [
                  {
                    "schema": "XML",
                    "htmlType": "span",
                    "javaType": "org.docx4j.wml.Text@2035225037",
                    "children": [],
                    "text": "For i in end"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "schema": "XML",
        "htmlType": "p",
        "javaType": "org.docx4j.wml.P@449240381",
        "children": [
          {
            "schema": "XML",
            "htmlType": "span",
            "javaType": "org.docx4j.wml.R@1126454617",
            "children": [
              {
                "schema": "XML",
                "htmlType": "span",
                "javaType": "org.docx4j.wml.Text@1122297225",
                "children": [],
                "text": "For i end"
              }
            ]
          }
        ]
      }
    ]
  }
]