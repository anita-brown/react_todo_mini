const endPoint = "https://debttracker.burgeon8services.xyz/api/collections/todos/records";
interface ResponseData {
    id: string;
    created: string;
    task: string;
    date: string;
    isDone: boolean;
}
export default endPoint
export type { ResponseData };
