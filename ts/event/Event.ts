class Event {
    public readonly type: string | symbol;
    public target: unknown;
    public currentTarget: unknown;

    constructor(type: string | symbol) {
        this.type = type;
    }

    public clone(): Event {
        return new Event(this.type);
    }
}

export default Event;
