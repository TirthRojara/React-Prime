import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber'
import { OverlayPanel } from 'primereact/overlaypanel'
import React, { useState } from 'react'

interface OverlayComponentProps {
    onSubmit: (value: number) => void;
}

const OverlayComponent = React.forwardRef<OverlayPanel, OverlayComponentProps>(({ onSubmit } , ref) => {
    const [inputValue, setInputValue] = useState<number>(0);

    const handleSubmit = () => {
        onSubmit(inputValue);
    };

    return (
        <OverlayPanel ref={ref}>
            <div className="flex flex-col gap-2 p-2 w-60">
                <InputNumber
                    value={inputValue}
                    onChange={(e) => setInputValue(e.value ?? 0)}
                    placeholder="Enter something"
                    className="p-inputtext-sm"
                />
                <Button
                    label="Submit"
                    size="small"
                    onClick={handleSubmit}
                />
            </div>
        </OverlayPanel>
    )
})

export default OverlayComponent
