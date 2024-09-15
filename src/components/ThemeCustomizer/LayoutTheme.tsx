import { Form } from 'react-bootstrap';
import * as layoutConstants from 'src/constants/common/layout';

interface LayoutThemeProps {
  changeLayoutColor: (value: any) => void;
  layoutTheme?: string;
  layoutConstants: typeof layoutConstants.LayoutTheme;
}

const LayoutTheme = ({
  changeLayoutColor,
  layoutTheme,
  layoutConstants,
}: LayoutThemeProps) => {
  return (
    <>
      <h6 className='fw-medium font-14 mt-4 mb-2 pb-1'>Color Scheme</h6>

      <Form.Check className='form-check form-switch mb-1'>
        <Form.Check.Input
          type='radio'
          name='data-bs-theme'
          id='layout-color-light'
          value={layoutConstants.THEME_LIGHT}
          onChange={e => changeLayoutColor(e.target.value)}
          checked={layoutTheme === layoutConstants.THEME_LIGHT}
        />
        <Form.Check.Label htmlFor='layout-color-light'>Light</Form.Check.Label>
      </Form.Check>

      <Form.Check className='form-check form-switch mb-1'>
        <Form.Check.Input
          type='radio'
          name='data-bs-theme'
          id='layout-color-dark'
          value={layoutConstants.THEME_DARK}
          onChange={e => changeLayoutColor(e.target.value)}
          checked={layoutTheme === layoutConstants.THEME_DARK}
        />
        <Form.Check.Label htmlFor='layout-color-dark'>Dark</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LayoutTheme;
