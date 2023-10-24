import "./ProgressBar.css";

const ProgressBar = ({name, percentage}) => {
    let currrentProgress = 100 - percentage * 95 / 100.0;
    let style = {
        right: `${currrentProgress}%`
    }
    
    return(
        <div className="progress-bar">
            <div className="metric-label">
                {name}
            </div>
            <div className="metric-percentage">
                {percentage} %
            </div>
            <div className="group-bars">
                <div className="target-progress"></div>
                <div className="current-progress" style={style}></div>  
            </div>
        </div>
    );
}

export default ProgressBar;