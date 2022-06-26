// user
export class User {
	id = 0;
	name = '';
	sex = '';
	dateBirth = '';
	dateMarry = '';
	placeBirth = '';
	dateDeath = '';
	placeDeath = '';
	content = '';
	honor = '';
	familySimple = ''
	marryId = 0

	initData(row: any) {
		this.id = row?.id;
		this.name = row?.name;
		this.sex = row?.sex;
		this.dateBirth = row?.dateBirth;
		this.dateMarry = row?.dateMarry;
		this.placeBirth = row?.placeBirth;
		this.dateDeath = row?.dateDeath;
		this.placeDeath = row?.placeDeath;
		this.content = row?.content;
		this.honor = row?.honor;
		this.familySimple = row?.familySimple;
	}
}
