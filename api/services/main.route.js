const router    = require('express').Router();
const axios     = require('axios').default;
const stringify = require('json-stringify-safe');
const routes    = require('../../config.env.json')

require('dotenv').config()

router.route('/').all(async (req,res)=>{
    res.status(400).json('You must configure a route first in the config.env.json file with its accompanying discord webhook url')
})

router.route('/:route').all(async(req, res) => {
    let content_array = [];
    for(let attribute in req.body){
        if(typeof(req.body[attribute])==="object"){
            for(let sub_attribute_1 in req.body[attribute]){
                if(typeof(req.body[attribute][sub_attribute_1])==="object"){
                    for(let sub_attribute_2 in req.body[attribute][sub_attribute_1]){
                        if(typeof(req.body[attribute][sub_attribute_1][sub_attribute_2])==="object"){
                            for(let sub_attribute_3 in req.body[attribute][sub_attribute_1][sub_attribute_2]){
                                content_array.push(attribute+" "+req.body[attribute]+" : "+sub_attribute_1+" "+req.body[attribute][sub_attribute_1]+" : "+sub_attribute_2+" "+req.body[attribute][sub_attribute_1][sub_attribute_2]+" : "+sub_attribute_3+" "+req.body[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3])
                            }
                        }
                        content_array.push(attribute+" "+req.body[attribute]+" : "+sub_attribute_1+" "+req.body[attribute][sub_attribute_1]+" : "+sub_attribute_2+" "+req.body[attribute][sub_attribute_1][sub_attribute_2])
                    }
                }
                content_array.push(attribute+" "+req.body[attribute]+" : "+sub_attribute_1+" "+req.body[attribute][sub_attribute_1])
            }
        }
        content_array.push(attribute+" "+req.body[attribute])
    }
    axios.post(routes[req.params.route+'_DISCORDHOOK_URL'], {
        "content":JSON.stringify(content_array, null, 4)
    })
        .then(_response => {
            res.status(204).json(stringify(_response, null, 4))
        })
        .catch(err=> {
            res.status(400).json(stringify(err, null, 4))
        });
})
module.exports = router;