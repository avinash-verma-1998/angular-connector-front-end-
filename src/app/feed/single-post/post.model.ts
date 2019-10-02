export class Post {
  constructor(
    public id: string,

    public postImageUrl: string,
    public caption: string,
    public comments: Array<object>,
    public likes: Array<string>
  ) {}
}
