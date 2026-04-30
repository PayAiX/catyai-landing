export default function CardBase({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`ds-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
