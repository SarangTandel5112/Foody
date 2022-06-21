import {Request} from 'express';

interface requestInterface extends Request{

    cart?: any;
    
}

export default requestInterface;