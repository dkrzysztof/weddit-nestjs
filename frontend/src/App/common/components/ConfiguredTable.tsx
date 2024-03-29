import { Dispatch } from '@reduxjs/toolkit';
import { Table } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { TableProps } from 'antd/lib/table';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { RootState } from 'App/state/root.reducer';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import { StatusType } from 'App/types/requestStatus';
import React, { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { LOADING } = StatusType;

interface ConfiguredTableProps extends TableProps<{}> {
	selectCollection: (state: RootState) => any;
	getCollectionThunkAction: (pagination: IPageQueryParams) => any;
	selectCollectionGetStatus: (state: RootState) => StatusType;
	selectCollectionGetQueryParams: (state: RootState) => IPageQueryParams;
	rowKey: string;
	columnsRenderMethod: (collection: any[], dispatch: Dispatch) => any[];
	style?: CSSProperties;
}

const ConfiguredTable: React.FC<ConfiguredTableProps> = ({
	selectCollection,
	getCollectionThunkAction,
	selectCollectionGetQueryParams,
	selectCollectionGetStatus,
	rowKey,
	columnsRenderMethod,
	style,
	...props
}) => {
	const dispatch = useDispatch();

	const collection = useSelector(selectCollection);
	const status = useSelector(selectCollectionGetStatus);
	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(selectCollectionGetQueryParams);

	const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
	};

	/*eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		dispatch(
			getCollectionThunkAction({
				pageNumber: pageNumber || defaultPageQueryParams.pageNumber,
				pageSize: pageSize || defaultPageQueryParams.pageSize
			})
		);
	}, [dispatch]);

	const handleTableChange = (pagination: PaginationConfig): any => {
		const { pageNumber: defaultPageNumber, pageSize: defaultPageSize, ...others } = defaultPageQueryParams;
		const pageNumber = pagination.current || defaultPageNumber;
		const pageSize = pagination.pageSize || defaultPageSize;
		dispatch(
			getCollectionThunkAction({
				pageNumber,
				pageSize,
				...others
			})
		);
	};

	return (
		<Table
			pagination={paginationConfig}
			onChange={handleTableChange}
			loading={status === LOADING}
			columns={columnsRenderMethod(collection, dispatch)}
			dataSource={collection}
			rowKey={rowKey}
			style={style}
			{...props}
		/>
	);
};

export default ConfiguredTable;
