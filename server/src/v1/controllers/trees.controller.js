const treesService = require('../services/trees.service');

const getTrees = async function(req, res, next) {
    const genders = req.query.gender ? [req.query.gender] : ['Male', 'Female'];
    const qUpper = Number(req.query.maxAge || 999);
    const qLower = Number(req.query.minAge || 0);
    
    const genderQuery = {
        gender: {
            $in: genders,
        },
    };

    const ageQueries = [
        {
            $and: [
                {
                    minAge: {
                        $lte: qUpper,
                    },
                },
                {
                    maxAge: {
                        $gte: qUpper,
                    },
                },
            ],
        },
        {
            $and: [
                {
                    minAge: {
                        $lte: qLower,
                    },
                },
                {
                    maxAge: {
                        $gte: qLower,
                    },
                },
            ],
        }, 
        {
            $and: [
                {
                    minAge: {
                        $gte: qLower,
                    },
                },
                {
                    maxAge: {
                        $lte: qUpper,
                    },
                },
            ],
        },
    ];
    
    try {
        const trees = await treesService.getTrees({ 
            filters: { 
                selector: {
                    $and: [
                        genderQuery,
                        { $or: ageQueries },
                    ],
                },
            },
        });
        res.status(200).send(trees);
    } catch(err) {
        next(err);
    }
};

const getTree = async function(req, res, next) {
    let id = req.params.id;
    try {
        const tree = await treesService.getTree(id);
        res.status(200).send(tree);
    } catch(err) {
        if(err.error === 'not_found') {
            const error = {
                message: `tree ${id} not found`,
                statusCode: 404,
            };
            next(error);
        } else {
            next(err);
        }
    }
};

module.exports = {
    getTree,
    getTrees,
};
