
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const PieChart = (props) => {

    //defining proptypes
    PieChart.propTypes = {
        values:PropTypes.array,
        plotTitle:PropTypes.string,
        height:PropTypes.number,
        width:PropTypes.number

    }

    //default props
    PieChart.defaultProp = {
        values: [1, 2, 3],
        plotTitle: '',
        height: 400,
        width: 400

    }

    //returning jsx
    return (
        <Plot
        data={[
          {
            values: props.values,
            type: 'pie',
          },
          //{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: props.width, height: props.height, title: props.plotTitle} }
      />

    );
}

export default PieChart