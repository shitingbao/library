// Result 接口反馈结构
export class Result {
	code = 0;
	mes = '';
	data = '';

	initData(row: any) {
		this.code = row?.code;
		this.mes = row?.mes;
		this.data = row?.data;
	}
}
