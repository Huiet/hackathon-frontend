import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/about')({
    component: AboutComponent,
});

function AboutComponent() {
    React.useEffect(() => {
        if (window.SwaggerUIBundle) {
            window.SwaggerUIBundle({
                url: '/merged-swagger.json',  // Path to your merged Swagger file
                dom_id: '#swagger-container',
                deepLinking: true,
                docExpansion: 'none',  // Keeps all sections collapsed initially
                defaultModelsExpandDepth: -1,  // Hides schema models by default
                layout: 'BaseLayout',  // Removes top bar but avoids limiting the container
                presets: [window.SwaggerUIBundle.presets.apis],
                operationsSorter: 'alpha'
            });
        }
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', padding: 0, margin: 0 }}>
            <div id="swagger-container" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );


    return (
        <div className="p-2">
            <h3 className="text-xl font-bold mb-4">API Documentation</h3>
            <p className="mb-4">
                This page contains the Swagger documentation for our API.
            </p>
            <div id="swagger-container" style={{ height: '80vh', width: '100%' }}></div>
        </div>
    );
}
