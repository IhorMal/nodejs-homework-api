const Joi = require('joi');

module.exports = {
    validationRagister: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(7)
                .max(20)
                .required(),
        
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
                .required(),

            subscription: Joi.string()
                        .optional()            
          });
        
          const contact = schema.validate(req.body);
          
          if (contact.error) {
            const error = contact.error.details[0].message;
            res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
            return
          }
          next()
    },
   validationLogin: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(7)
                .max(20)
                .required(),
        
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','ua'] } })
                .required()      
          });
        
          const contact = schema.validate(req.body);
          
          if (contact.error) {
            const error = contact.error.details[0].message;
            res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
            return
          }
          next()
    },
   validationVerify: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','ua'] } })
                .required()      
          });
        
          const contact = schema.validate(req.body);
          
          if (contact.error) {
            const error = contact.error.details[0].message;
            res.status(400).json({"message": `${error.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
            return
          }
          next()
    }
}  