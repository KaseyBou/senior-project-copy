
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const ScatterPlot = (props) => {

    //defining proptypes
    ScatterPlot.propTypes = {
        data:PropTypes.array,
        plotTitle:PropTypes.string,
        height:PropTypes.number,
        width:PropTypes.number,
        margin:PropTypes.number
    }

    //default props
    ScatterPlot.defaultProp = {
        plotTitle: '',
        height: 400,
        width: 400,
        margin: 50
    }

    //returning jsx
    return (
        <Plot
        data={props.data}
        layout={ {showlegend: !props.hideLegend, width: props.width, height: props.height, title: props.plotTitle, margin: {l: props.margin, r: props.margin, t: props.margin, b: props.margin}} }
      />

    );
}

export default ScatterPlot