function errorhandling(err: any, req: any, res: any, next: any) {
    console.log("Something Failed");
    res.status(500).send("Something Failed")
}

export default errorhandling;