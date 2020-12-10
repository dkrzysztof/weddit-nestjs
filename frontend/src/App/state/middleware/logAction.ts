const logActionMiddleware = ({ dispatch, getState }) => (next) => (action) => {
	return next(action);
};

export default logActionMiddleware;
