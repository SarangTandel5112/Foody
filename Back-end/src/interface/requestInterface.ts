import {Request} from 'express';

interface requestInterface extends Request{

    user?: any;
    
}

export default requestInterface;