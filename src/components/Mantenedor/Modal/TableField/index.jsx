import { Col, Form } from "react-bootstrap";
import { getInType } from "@/components/Mantenedor/utils/parsers";

function TableField({ field, value, mode }) {
  const isView = mode === "view";
  const isReadOnly = field.isReadOnly === true || isView;
  const isRequired = !isReadOnly && field.required === true;
  const isWide = field.type === "text";
  const enabledSelector = !isView && field.options;

  const controlId = `${mode}-${field.key}`;
  const commonProps = {
    name: field.key,
    required: isRequired,
    disabled: isReadOnly,
  };
  const valueProps = isView ? { value } : { defaultValue: value };

  const label = <Form.Label className="fw-bold">{field.label}</Form.Label>;
  const width = isWide ? 12 : 6;

  if (enabledSelector) {
    return (
      <Col md={width}>
        <Form.Group className="mb-3" controlId={controlId}>
          {label}
          <Form.Select {...commonProps} {...valueProps}>
            <option value="">Seleccione...</option>
            {field.options.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    );
  }

  const isTextArea = field.type === "text";
  const inputType = isView ? "text" : getInType(field.type);
  const controlProps = isTextArea
    ? { as: "textarea", rows: 3 }
    : { type: inputType, min: inputType === "number" ? 0 : undefined };

  return (
    <Col md={width}>
      <Form.Group className="mb-3" controlId={controlId}>
        {label}
        <Form.Control
          {...controlProps}
          readOnly={isView}
          {...commonProps}
          {...valueProps}
        />
      </Form.Group>
    </Col>
  );
}

export default TableField;
