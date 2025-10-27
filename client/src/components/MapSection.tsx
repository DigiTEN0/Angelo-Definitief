export function MapSection() {
  return (
    <section className="w-full" style={{ padding: 0, margin: 0 }}>
      <div style={{ position: 'relative', textAlign: 'right', width: '100%', height: 0, paddingBottom: '30%' }}>
        <div style={{ overflow: 'hidden', background: 'none', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <iframe 
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://maps.google.com/maps?width=600&height=300&hl=en&q=405%20Rue%20de%20la%20Concorde%20suite%20906&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          />
        </div>
      </div>
    </section>
  );
}
