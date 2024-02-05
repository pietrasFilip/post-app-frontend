import {FC} from "react";
import {QueueMonitorStatistics} from "../../types/dto/QueueMonitorStatistics";

const MonitorQueue: FC<{monitor: QueueMonitorStatistics}> = ({monitor}) => (
    <div className="card-body">
        <h5 className="card-title">Clients Ahead: {monitor.clientsCount}</h5>
        <h5 className="card-title">Time Left: {monitor.timeLeft}</h5>
    </div>
);

export default MonitorQueue;