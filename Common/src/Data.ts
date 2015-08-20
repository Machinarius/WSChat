export class Message {
	private _contents: string;
	private _authorName: string;
	private _timestamp: number;
	
	constructor(contents: string, authorName: string, timestamp: number) {
		this._contents = contents;
		this._authorName = authorName;
		this._timestamp = timestamp;
	}
	
	public get contents(): string {
		return this._contents;
	}
	
	public get authorName(): string {
		return this._authorName;
	}
	
	public get timestamp(): number {
		return this._timestamp;
	}
}