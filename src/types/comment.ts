export interface IComment {
    _id: string
    recipeId: string
    userId: IUserId
    comment: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface IUserId {
    _id: string
    firstName: string
    lastName: string
    email: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profilePhoto: any
  }
  