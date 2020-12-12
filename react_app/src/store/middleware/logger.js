const logger = store => next => action => {
 console.log('logger middleware');
 next(action);
}

export default logger;