import { Form } from 'react-final-form';
import {
  Grid, Button, Divider, Typography
} from '@material-ui/core';
import React from 'react';
import Autocomplete from '../Fields/Autocomplete';
import Checkbox from '../Fields/Checkbox';
import Date from '../Fields/Date';
import Radio from '../Fields/Radio';
import Select from '../Fields/Select';
import Text from '../Fields/Text';
import TextArea from '../Fields/TextArea';
import Time from '../Fields/Time';
import Email from '../Fields/Email';
import Password from '../Fields/Password';
import Switch from '../Fields/Switch';
import AutoCompleteSingle from '../Fields/AutocompleteSingle';
import File from '../Fields/File';
import Lookup from '../Fields/Lookup';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fieldsContainer: {
    minHeight: theme.spacing(60),
    maxHeight: theme.spacing(60),
    overflow: 'scroll'
    //height: theme.spacing(60)
  }, buttons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    left: theme.spacing(138),
    //top: theme.spacing(0.1),
  },
  formTitle: {
    float: 'left',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    width: theme.spacing(138)
  },
  formTitleButtons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    // left: theme.spacing(126.5),
  },
  fields: {
    margin: theme.spacing(1),
  }
}));

export default function DynamicForm({ fieldsToRender, onSubmit, buttonCancelText, buttonSubmitText, onFileUpload, defaultValue, formTitle }) {
  const [submittedValues, setSubmittedValues] = React.useState(undefined);
  const classes = useStyles();

  const onSubmitForm = (values) => {
    setSubmittedValues(values);
    onSubmit(values);
  };

  const validate = values => {
    const errors = {};
    var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    fieldsToRender.map((data, index) => {
      if (fieldsToRender[index]['type']) {
        let name = (fieldsToRender[index]['name']).toString();
        let label = (fieldsToRender[index]['label']).toString();
        let type = (fieldsToRender[index]['type']).toString();
        let required = (fieldsToRender[index]['required']);
        switch (type) {
          case 'Autocomplete':
            if ((values[name].length == 0) && required)
              errors[name] = label + ' required';
            break;
          case 'Email':
            if ((!values[name]) && required)
              errors[name] = label + ' required';
            else {
              if (!regex.test(values[name]) && values[name])
                errors[name] = label + ' invalid';
            }
            break;
          default:
            if (!values[name] && required)
              errors[name] = label + ' required';
            break;
        }
      }
    }
    );
    return errors;
  };

  //&& fieldsToRender[index]['options']['display']== null
  const renderFields = (
    <Grid container spacing={2} className={classes.fields} key={`grid-form${Math.random()}`}>
      {fieldsToRender.map((data, index) => (
        <React.Fragment key={`layout-frag${Math.random()}`}>
          {(fieldsToRender[index]['type'] == 'Text') &&
            <Grid item xs={12} md={4} key={index}>
              <Text index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Date') &&
            <Grid item xs={12} md={4} key={index}>
              <Date index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Select') &&
            <Grid item xs={12} md={4} key={index}>
              <Select index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Checkbox') &&
            <Grid item xs={12} md={4} key={index}>
              <Checkbox index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Time') &&
            <Grid item xs={12} md={4} key={index}>
              <Time index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'TextArea') &&
            <Grid item xs={12} md={12} key={index}>
              <TextArea index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Radio') &&
            <Grid item xs={12} md={4} key={index}>
              <Radio index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Autocomplete') &&
            <Grid item xs={12} md={4} key={index}>
              <Autocomplete index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Email') &&
            <Grid item xs={12} md={4} key={index}>
              <Email index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Password') &&
            <Grid item xs={12} md={4} key={index}>
              <Password index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Switch') &&
            <Grid item xs={12} md={4} key={index}>
              <Switch index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'AutocompleteSingle') &&
            <Grid item xs={12} md={4} key={index}>
              <AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Upload') &&
            <Grid item xs={12} md={4} key={index}>
              <File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Lookup') &&
            <Grid item xs={12} md={4} key={index}>
              <Lookup index={index} fieldsToRender={fieldsToRender} />
            </Grid>
          }
        </React.Fragment>
      ))}
    </Grid>
  );

  return (
    <Paper elevation={0} variant="outlined">
      <Form
        onSubmit={onSubmitForm} style={{ marginTop: 16 }}
        initialValues={submittedValues ? submittedValues : defaultValue}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <div className={(formTitle) ? classes.formTitle : ''}>
                <Typography color='primary' variant="overline">{formTitle}</Typography>
              </div>
              <div className={(formTitle) ? classes.formTitleButtons : classes.buttons}>
                <Button size="small" type="button" onClick={reset} disabled={submitting || pristine} disableElevation>{buttonCancelText}</Button>
                <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{buttonSubmitText}</Button>
              </div>
            </div>
            <Divider />
            <div className={classes.fieldsContainer}>
              <Grid container alignItems="flex-end" spacing={1}>
                {renderFields}
              </Grid>
            </div>
            <Divider />
            <div className={classes.buttons}>
              <Button size="small" type="button" onClick={reset} disabled={submitting || pristine} disableElevation>{buttonCancelText}</Button>
              <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{buttonSubmitText}</Button>
            </div>
          </form>
        )}
      />
    </Paper>
  );
}