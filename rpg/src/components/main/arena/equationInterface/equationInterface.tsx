import s from './equationInterface.module.scss'
import { Formik, Form, Field, FormikProps } from 'formik';
import { EnteredEquationAnswer } from '@redux/fightReducer';
import systemSymbol from 'assets/imgs/System Symbol.png';
import loadingSpinner from '@assets/imgs/loadingSpinner.gif'
import { EquationAnswer } from 'common/equationCreator';

const CustomField: React.FC<{ formik: FormikProps<MyFormValues>, name: 'x' | 'y', autoFocus?: boolean }> = ({ formik, name, autoFocus = false }) => {
    const placeholder = name.toUpperCase() + " value(s)"
    return (
        <div className={s.equationInterface__answerForm_answers_fieldContainer}>
            <Field className={s.equationInterface__answerForm_answers_fieldContainer_field}
                name={name} autoFocus={autoFocus} autoComplete="off" placeholder={placeholder}
                onChange={(e: any) => {
                    const value = e.currentTarget.value;
                    const regex = /^[0-9-,.]*$/;
                    if (regex.test(value.toString())) {
                        formik.setFieldValue(name, value);
                    }
                }}
            />
        </div>
    )
}

type MyFormValues = {
    x: string
    y: string
}

type EquationInterfaceProps = {
    equation: string | null
    answerEquation: (enteredAnswer: EnteredEquationAnswer) => void
    timeForAnswer: number | 'NO LIMIT'
}

const EquationInterface: React.FC<EquationInterfaceProps> = ({ answerEquation, ...props }) => {
    const initialValues: MyFormValues = {
        x: '',
        y: '',
    }
    if (props.equation === null) return (
        <div className={`${s.equationInterface} arenaInterfaceContainer`} >
            <div className={s.equationInterface__loadingSpinnerContainer}>
                <img src={loadingSpinner} alt="loading..." className={s.equationInterface__loadingSpinnerContainer_img} />
            </div>
        </div>
    )
    else {
        const equation = props.equation.split(',')
        return (
            <div className={`${s.equationInterface} arenaInterfaceContainer`}>
                <div className={s.equationInterface__equation}>
                    {(equation.length > 1) &&
                        <img src={systemSymbol} alt="system of equations symbol" className={s.equationInterface__equation_symbol} />
                    }
                    <div className={s.equationInterface__equation_parts}>
                        {equation.map(el =>
                            <p key={el} className={s.equationInterface__equation_parts_part}>
                                {el}
                            </p>
                        )}
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        answerEquation(values);
                    }}
                >
                    {formik => <Form className={s.equationInterface__answerForm} >
                        {props.timeForAnswer !== 'NO LIMIT' &&
                            <div className={s.equationInterface__answerForm_timer}>
                                <p>TIME FOR DEFENSE:&nbsp;</p>
                                <div className={s.equationInterface__answerForm_timer_title}>{props.timeForAnswer} </div>
                            </div>
                        }
                        <div className={s.equationInterface__answerForm_title}>
                            <p>YOUR ANSWER IS</p>
                        </div>
                        <div className={s.equationInterface__answerForm_answers}>
                            <CustomField formik={formik} name="x" autoFocus={true} />
                            {(equation.length > 1) &&
                                <CustomField formik={formik} name="y" />
                            }
                        </div>
                        <button className={s.equationInterface__answerForm_btn} type="submit">
                            <p>SEND (Enter)</p>
                        </button>
                    </Form>}
                </Formik>
            </div>
        )
    }
}

export default EquationInterface