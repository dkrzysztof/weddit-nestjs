const logActionMiddleware = ({ dispatch, getState }) => (next) => (action) => {
	// console.log('[ACTION:INVOKED]:', action);
	return next(action);
};

export default logActionMiddleware;
