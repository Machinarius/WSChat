export class Message {
	private _contents: String;
	private _authorName: String;
	private _timestamp: Number;
	
	constructor(contents: String, authorName: String, timestamp: Number) {
		this._contents = contents;
		this._authorName = authorName;
		this._timestamp = timestamp;
	}
	
	public get contents(): String {
		return this._contents;
	}
	
	public get authorName(): String {
		return this._authorName;
	}
	
	public get timestamp(): Number {
		return this._timestamp;
	}
}