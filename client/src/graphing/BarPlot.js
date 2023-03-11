
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const BarPlot = (props) => {

    //defining proptypes
    BarPlot.propTypes = {
        xData:PropTypes.array,
        yData:PropTypes.array,
        plotTitle:PropTypes.string,
        height:PropTypes.number,
        width:PropTypes.number,
        margin:PropTypes.number
    }

    //default props
    BarPlot.defaultProp = {
        xData: [1, 2, 3],
        yData: [2, 5, 3],
        plotTitle: '',
        height: 400,
        width: 400,
        margin: 50
    }

    //returning jsx
    return (
        <Plot
        data={[
          {
            x: props.xData,
            y: props.yData,
            type: 'bar',
          },
          //{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: props.width, height: props.height, title: props.plotTitle, margin: {l: props.margin, r: props.margin, t: props.margin, b: props.margin}} }
      />

    );
}

export default BarPlot