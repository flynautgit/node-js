enum user_type {
	user,
	admin
}

enum gender  {
	MALE,
	FEMALE,
}

enum account_type  {
	local,
	google,
	facebook,
	apple
}


enum account_status  {
	unverified,
	active,
	blocked,
	deleted
}

enum user_status  {
	active,
	inactive
}

export {user_type,gender,account_type,account_status,user_status};