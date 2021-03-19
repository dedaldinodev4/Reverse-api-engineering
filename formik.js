/**
 * @name FakeLibriryFormik
 * @author Dedaldino Daniel
 * @description "Reverse Library Formik Engineering"
 */


/**
 * 
 * @param {*} param 
 */
function useFormik({
    initialValues,
    validate
}){
    const [touched, setTouchedFields] = useState({});
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateValues(values);
    }, [values]);


    /**
     * @function HandleChange Values
     * @param {*} event 
     */
    function handleChange(event) {
        const fieldName = event.target.getAttribute('name');
        const { value } = event.target;

        setValues({
            ...values,
            [fieldName]: value,
        });

        
    }

    /**
     * @function HandleBlur
     * @param {*} event 
     */
    function handleBlur(event) {
        const fieldName = event.target.getAttribute('name');

        setTouchedFields({
            ...touched,
            [fieldName]: true,
        })
    }

    /**
     * @function validateValues
     * @param {*} values 
     */
    function validateValues(values) {
        setErrors(validate(values));
    }

    return {
        values,
        errors,
        touched,
        setErrors,
        handleBlur,
        handleChange,
    };
}