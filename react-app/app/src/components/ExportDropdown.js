import React, {useState} from 'react'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import './styleSheets/exportDropdown.css';


export function ExportDropdown({dropdownOptions, onConfirm})
{
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState([]);

    function saveSelected (selectedItems)
    {
        setSelected(selectedItems.selectedKeys);
    }

    function confirm ()
    {
        onConfirm(selected);
        setVisible(false);
    }

    const menu =
    (
        <Menu 
            multiple
            onSelect={saveSelected}
            onDeselect={saveSelected}
            style={{ width: 170}}
        >
            {dropdownOptions.map((option) =>
            {
                return <MenuItem key={option.key}>{option.value}</MenuItem>
            })}
            <Divider />
            <MenuItem key="confirm" disabled>
                <div className="confirm-export-container">
                    <button className='confirm-export'
                        style={{
                            cursor: 'pointer',
                            pointerEvents: 'visible',
                        }}
                        onClick={confirm}>
                        Exportieren
                    </button>
                </div>
            </MenuItem>
        </Menu>
    );

  return (
      <Dropdown
        trigger={['click']}
        onVisibleChange={setVisible}
        visible={visible}
        closeOnSelect={false}
        overlay={menu}
        animation="slide-up"
      >
        <button className='openExportMenuButton'style={{ width: 120, height: 30 }}>
            <div>Export</div>
            <div>&#9660;</div>
        </button>
      </Dropdown>
  )
}
