
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const ScatterPlot = (props) => {

    //defining proptypes
    ScatterPlot.propTypes = {
        xData:PropTypes.array,
        yData:PropTypes.array,
        plotTitle:PropTypes.string,
        height:PropTypes.number,
        width:PropTypes.number

    }

    //default props
    ScatterPlot.defaultProp = {
        xData: [1, 2, 3],
        yData: [2, 5, 3],
        plotTitle: '',
        height: 400,
        width: 400

    }

    //returning jsx
    return (
        <Plot
        data={[
          {
            x: props.xData,
            y: props.yData,
            type: 'scatter',
          },
          //{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: props.width, height: props.height, title: props.plotTitle} }
      />

    );
}

export default ScatterPlot