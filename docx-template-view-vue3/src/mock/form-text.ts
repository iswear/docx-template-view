import type { DocxRendererTemplate } from "@/components/@types/render";

export const data: DocxRendererTemplate = {
  layout: {
    pageWidth: 793.73,
    marginTop: 94.47,
    marginBottom: 94.47,
    marginLeft: 45.33,
    marginRight: 45.33
  },
  nodes: [
  {
    "schema": "XML",
    "htmlType": "ignore",
    "javaType": "org.docx4j.wml.Body@417621837",
    "style": "",
    "children": [
      {
        "schema": "XML",
        "htmlType": "p",
        "javaType": "org.docx4j.wml.P@1546727972",
        "style": "text-align:left;",
        "children": [
          {
            "schema": "XML",
            "htmlType": "span",
            "javaType": "org.docx4j.wml.R@1268088240",
            "style": "font-size:14px;color:#FF0000;",
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
                      "kind": "expr:function-call",
                      "optional": false,
                      "function": "text",
                      "args": [
                        {
                          "kind": "expr:access",
                          "root": {
                            "kind": "expr:variable",
                            "identifier": "order"
                          },
                          "chainedAccessors": [],
                          "targetAccessor": {
                            "type": "property-accessor",
                            "optional": false,
                            "name": "orderNo"
                          }
                        },
                        {
                          "kind": "expr:const-map",
                          "entries": [
                            {
                              "key": "editable",
                              "value": {
                                "kind": "expr:const-boolean",
                                "value": true
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
] 
}
