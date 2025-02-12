import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
    component: AboutComponent,
});

function AboutComponent() {
    return (
        <div className="p-2">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="mb-4">
                This page contains the Swagger documentation for our API.
            </p>
            <iframe
                src="https://your-swagger-ui-url"
                title="Swagger UI"
                style={{
                    width: '100%',
                    height: '80vh',
                    border: 'none',
                }}
            />
        </div>
    );
}
