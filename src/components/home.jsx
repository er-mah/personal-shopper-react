import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {Password} from 'primereact/password';
import {Checkbox} from 'primereact/checkbox';
import {Dialog} from 'primereact/dialog';
import {Divider} from 'primereact/divider';
import {classNames} from 'primereact/utils';
import {InputNumber} from "primereact/inputnumber";

export const Home = () => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const [contact, setContact] = useState(null);
    const ContactItems = [{label: 'Mensaje de WhatsApp', value: 'WhatsApp'}, {
        label: 'Correo electrónico',
        value: 'Email'
    }];

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confPassword: '',
            accept: false
        },
        validationSchema: {},
        validate: (data) => {
            let errors = {};

            if (!data.fullName) {
                errors.fullName = 'Su nombre completo es requerido.';
            }

            if (!data.email) {
                errors.email = 'Su correo electrónico es requerido.';
            } else if ('!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i'.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            if (!data.password) {
                errors.confPassword = 'Password is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center">
        <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)}/>
    </div>;
    const passwordHeader = <h4>Elija una contraseña</h4>;
    const passwordFooter = (
        <React.Fragment>
            <Divider/>
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
                <li>Por lo menos una minúscula</li>
                <li>Por lo menos una mayúscula</li>
                <li>Por lo menos un número</li>
                <li>8 caracteres como mínimo</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter}
                    showHeader={false} breakpoints={{'960px': '80vw'}} style={{width: '30vw'}}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{fontSize: '5rem', color: 'var(--green-500)'}}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{lineHeight: 1.5, textIndent: '1rem'}}>
                        Your account is registered under name <b>{formData.fullName}</b> ; it'll be valid next 30 days
                        without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <p>TODO: FINISH VALIDATION WITH YUP</p>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="fullName" name="name" value={formik.values.name}
                                           onChange={formik.handleChange} autoFocus
                                           className={classNames({'p-invalid': isFormFieldValid('name')})}/>
                                <label htmlFor="fullName"
                                       className={classNames({'p-error': isFormFieldValid('fullName')})}>Nombre completo *</label>
                            </span>
                            {getFormErrorMessage('fullName')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="dni" name="name" value={formik.values.name}
                                           onChange={formik.handleChange} autoFocus
                                           className={classNames({'p-invalid': isFormFieldValid('dni')})}/>
                                <label htmlFor="fullName"
                                       className={classNames({'p-error': isFormFieldValid('dni')})}>DNI *</label>
                            </span>
                            {getFormErrorMessage('fullName')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"/>
                                <InputText autoComplete="email" id="email" name="email" value={formik.values.email}
                                           onChange={formik.handleChange}
                                           className={classNames({'p-invalid': isFormFieldValid('email')})}/>
                                <label htmlFor="email" className={classNames({'p-error': isFormFieldValid('email')})}>Correo electrónico *</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password autoComplete="new-password" id="password" name="password"
                                          weakLabel="Débil" mediumLabel="Media" strongLabel="Fuerte"
                                          promptLabel="Elija una contraseña"
                                          value={formik.values.password} onChange={formik.handleChange} toggleMask
                                          className={classNames({'p-invalid': isFormFieldValid('password')})}
                                          footer={passwordFooter}/>
                                <label htmlFor="password" className={classNames(
                                    {'p-error': isFormFieldValid('password')})}>Contraseña *</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password autoComplete="new-password" id="confPassword" name="confPassword"
                                          feedback={false}
                                          value={formik.values.confPassword} onChange={formik.handleChange} toggleMask
                                          className={classNames({'p-invalid': isFormFieldValid('password')})}
                                          />
                                <label htmlFor="password"
                                       className={classNames({'p-error': isFormFieldValid('confPassword')})}>
                                    Confirmar contraseña *
                                </label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept}
                                      onChange={formik.handleChange}
                                      className={classNames({'p-invalid': isFormFieldValid('accept')})}/>
                            <label htmlFor="accept" className={classNames({'p-error': isFormFieldValid('accept')})}>I
                                agree to the terms and conditions*</label>
                        </div>

                        <Button type="submit" label="Submit" className="mt-2"/>



                        <h2>Tus datos de contacto</h2>
                        <div className="field">
                            <label htmlFor="nombre" className="block">Nombre completo</label>
                            <InputText id="nombre" className="block"/>
                        </div>
                        <div className="field">
                            <label htmlFor="email" className="block">Correo electrónico</label>
                            <InputText id="email" aria-describedby="email-help" className="block"/>
                        </div>
                        <div className="field">
                            <label htmlFor="addr" className="block">Dirección</label>
                            <InputText id="addr" aria-describedby="addr-help" className="block"/>
                        </div>
                        <div className="field">
                            <label htmlFor="tel" className="block">Teléfono</label>
                            <InputNumber id="tel" aria-describedby="tel-help" className="block"/>
                        </div>
                        <div className="field">
                            <label htmlFor="comWay" className="block">Medio de contacto de preferencia</label>
                            <Dropdown value={contact} options={ContactItems}
                                      onChange={(e) => setContact(e.value)}
                                      placeholder="Seleccioná una forma de contacto"/>
                            <small id="comWay-help" className="block">Decinos por qué medio preferís que te
                                contactemos</small>
                        </div>



                    </form>
                </div>
            </div>
        </div>
    );
}