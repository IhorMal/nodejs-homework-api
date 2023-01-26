const Joi = require('joi');

module.exports = {
    validationAddContact: (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
            res.status(400).json({ "message": "missing fields"})
            return
        }
        const schema = Joi.object({
            name: Joi.string()
                  .required(),
        
            email: Joi.string()
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net',] } })
                  .required(),
        
            phone : Joi.string()
                  .required(),
          });
        
          const contact = schema.validate(req.body);
          
          if (contact.error) {
            const error = contact.error.details[0].message;
            res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
            return
          }
          next()
    },
    validationUpdateContact: (req, res, next) => {
    
        const schema = Joi.object({
            name: Joi.string()
                  .optional(),
                
            email: Joi.string()
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                  .optional(),
            phone : Joi.string()
                  .optional(),
                  
          }).min(1)
        
          const contact = schema.validate(req.body);
          
          if (contact.error) {
            const error = contact.error.details[0].message;
             res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
             return
          }
          
          next()  
    },
    validationUpdateStatusContact: (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
          res.status(400).json({ "message": "missing fields"})
          return
      }
      const schema = Joi.object({
            favorite: Joi.boolean()
                .optional(), 
        })   
        const contact = schema.validate(req.body);
        if (contact.error) {
          const error = contact.error.details[0].message;
           res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
           return
        }
        next()
      }
}