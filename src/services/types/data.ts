export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TUserFull= {
  readonly success: boolean;
  readonly user: TUser;
}

export type TRegistrationDetals = {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly success: boolean;
  readonly user: TUser;
};

export type TResetPassword = {
  readonly success: boolean;
  readonly message: string;
}

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  __v: number;
  readonly _id: string;
  readonly id?: number;
};

export type TIngredients = {
	readonly data: ReadonlyArray<TIngredient>;
	readonly success: boolean;
}

export type TOwner = {
  readonly createdAt: string;
  readonly updatedAt: string;
} & TUser

export type TOrder = {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<TIngredient>;
  readonly name: string;
  readonly number: number;
  readonly owner?: TOwner;
  readonly price: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}


export type TOrderDetails = {
  readonly name: string;
  readonly success: boolean;
  readonly order: TOrder;
}

export type TOrderFeed = {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export type TOrdersFeed = {
  readonly orders: Array<TOrderFeed>
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number
}
export type TLocationBackground = {
  pathname: string;
	search: string;
	hash: string;
	state: null;
}
export type TLocation = {
  background: TLocationBackground;
  pathname: string;
	search: string;
	hash: string;
  from?: object;
};
