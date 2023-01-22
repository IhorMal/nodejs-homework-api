const Joi = require('joi');

module.exports = {
    validationAddContact: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                  .required(),
        
            email: Joi.string()
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                  .required(),
        
            phone : Joi.string()
                  .required(),
          });
        
          const contact = schema.validate(req.body);
          if (contact.error) {
            res.status(400);
            res.json({"message": "missing required name field"})
            return
          }
          next()
    },
    validationUpdateContact: (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            res.status(400)
            res.json({ "message": "missing fields"})
            return
        }
        const schema = Joi.object({
            name: Joi.string()
                  .optional(),
                
            email: Joi.string()
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                  .optional(),
            phone : Joi.string()
                  .optional(),
                  
          });
        
          const contact = schema.validate(res.body);
          if (contact.error) {
            return false
          }
          
          next()
        
    }
}