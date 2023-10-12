import React from 'react';
import Rodal from 'rodal';
import ReactDOM from 'react-dom';
import 'rodal/lib/rodal.css';
import './../styleSheets/OverlayDialogFrameStyle.css';

export class OverlayDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            isVisible: props.isVisible,
        };

    }

    OnAnimationEnd()
    {
        if(!this.state.isVisible)
            ReactDOM.render(null, document.getElementById("portal"));
    }

    show()
    {
        this.setState({isVisible: true });
    }

    hide()
    {
        this.setState({isVisible: false });
        if(this.props.onCloseCallback !== undefined)
            this.props.onCloseCallback();
    }

    render()
    {
        return ReactDOM.createPortal
        (
            <Rodal className="overlay-frame"
            width={this.props.width}
            height={this.props.height}
            measure={this.props.measure}
            visible={this.state.isVisible}
            onClose={this.hide.bind(this)}
            showCloseButton={this.props.showCloseButton}
            closeOnEsc={this.props.closeOnEsc}
            closeMaskOnClick={this.props.closeMaskOnClick}
            onAnimationEnd={this.OnAnimationEnd.bind(this)}>
                    <div className="content-container">‚
                        {this.props.children}
                    </div>
                    <div className="footer-container">
                        {this.props.hideButton ?
                            null :
                            <button className="footer-button" onClick={this.hide.bind(this)}>Schließen</button>
                        }
                    </div>
            </Rodal>,
            document.getElementById('portal')
        );
    }
}