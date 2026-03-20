import React, { useState, useRef, useEffect, useCallback } from 'react';

const DevicePlacementSystem = () => {
  // Password state
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Canvas and image state
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Devices state - positions stored as percentages (0-1) relative to image
  const [devices, setDevices] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedDevice, setDraggedDevice] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingDevice, setResizingDevice] = useState(null);

  // Hardcoded device types
  const deviceTypes = [
    { id: 'sensor', name: 'Temperature Sensor', color: '#FF6B6B', icon: '🌡️' },
    { id: 'camera', name: 'Security Camera', color: '#4ECDC4', icon: '📹' },
    { id: 'light', name: 'Smart Light', color: '#FFE66D', icon: '💡' }
  ];

  // Handle password verification
  const handlePasswordSubmit = () => {
    if (password === '1234') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
      setIsAuthenticated(false);
    }
  };

  // Fetch image from API (simulated)
  const fetchImageFromAPI = async () => {
    // Simulating API call - replace with your actual API endpoint
    try {
      // Example: const response = await fetch('your-api-endpoint');
      // const blob = await response.blob();
      // const imageUrl = URL.createObjectURL(blob);
      
      // For demo, using a placeholder image service
      const imageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200';
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setBackgroundImage(img);
        setImageDimensions({ width: img.width, height: img.height });
        drawCanvas();
      };
      img.src = imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setBackgroundImage(img);
          setImageDimensions({ width: img.width, height: img.height });
          drawCanvas();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate canvas size maintaining aspect ratio
  const updateCanvasSize = useCallback(() => {
    if (!containerRef.current || !backgroundImage) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    const imgAspect = imageDimensions.width / imageDimensions.height;
    const containerAspect = containerWidth / containerHeight;

    let canvasWidth, canvasHeight;

    if (imgAspect > containerAspect) {
      canvasWidth = containerWidth;
      canvasHeight = containerWidth / imgAspect;
    } else {
      canvasHeight = containerHeight;
      canvasWidth = containerHeight * imgAspect;
    }

    setCanvasSize({ width: canvasWidth, height: canvasHeight });
  }, [backgroundImage, imageDimensions]);

  // Draw canvas with background and devices
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !backgroundImage) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Draw devices
    devices.forEach(device => {
      const x = device.relX * canvas.width;
      const y = device.relY * canvas.height;
      const width = device.relWidth * canvas.width;
      const height = device.relHeight * canvas.height;

      // Draw card background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Rounded rectangle
      const radius = 8;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      // Draw color indicator
      ctx.fillStyle = device.color;
      ctx.fillRect(x, y, 6, height);
      
      // Draw icon
      ctx.font = `${Math.min(width, height) * 0.3}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(device.icon, x + width / 2, y + height / 2 - 10);
      
      // Draw name
      ctx.fillStyle = '#333';
      ctx.font = `bold ${Math.max(10, height * 0.15)}px Arial`;
      ctx.fillText(device.name, x + width / 2, y + height / 2 + 15);
      
      // Draw resize handle
      ctx.fillStyle = '#666';
      ctx.beginPath();
      ctx.arc(x + width - 8, y + height - 8, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw delete button
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(x + 12, y + 12, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText('×', x + 12, y + 12);
    });
  }, [backgroundImage, devices, canvasSize]);

  // Update canvas when size changes
  useEffect(() => {
    updateCanvasSize();
  }, [updateCanvasSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas, canvasSize]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasSize]);

  // Add device to canvas
  const addDevice = () => {
    if (!selectedDeviceType || !backgroundImage) return;
    
    const deviceType = deviceTypes.find(d => d.id === selectedDeviceType);
    const newDevice = {
      id: Date.now(),
      type: deviceType.id,
      name: deviceType.name,
      color: deviceType.color,
      icon: deviceType.icon,
      // Initial position: center of canvas with default size (10% of image dimensions)
      relX: 0.45,
      relY: 0.45,
      relWidth: 0.1,
      relHeight: 0.08
    };
    
    setDevices([...devices, newDevice]);
    setSelectedDeviceType('');
  };

  // Mouse/Touch event handlers for dragging and resizing
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    
    // Check if clicking on a device
    for (let i = devices.length - 1; i >= 0; i--) {
      const device = devices[i];
      const x = device.relX * canvas.width;
      const y = device.relY * canvas.height;
      const width = device.relWidth * canvas.width;
      const height = device.relHeight * canvas.height;
      
      // Check delete button
      const deleteDist = Math.sqrt(Math.pow(pos.x - (x + 12), 2) + Math.pow(pos.y - (y + 12), 2));
      if (deleteDist <= 10) {
        const newDevices = devices.filter((_, index) => index !== i);
        setDevices(newDevices);
        return;
      }
      
      // Check resize handle
      const resizeDist = Math.sqrt(Math.pow(pos.x - (x + width - 8), 2) + Math.pow(pos.y - (y + height - 8), 2));
      if (resizeDist <= 10) {
        setResizingDevice(device);
        setIsDragging(true);
        return;
      }
      
      // Check device body
      if (pos.x >= x && pos.x <= x + width && pos.y >= y && pos.y <= y + height) {
        setDraggedDevice(device);
        setDragOffset({ x: pos.x - x, y: pos.y - y });
        setIsDragging(true);
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !canvasRef.current) return;
    
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    
    if (resizingDevice) {
      const x = resizingDevice.relX * canvas.width;
      const y = resizingDevice.relY * canvas.height;
      let newWidth = (pos.x - x) / canvas.width;
      let newHeight = (pos.y - y) / canvas.height;
      
      // Minimum size constraints
      newWidth = Math.max(0.05, Math.min(newWidth, 1 - resizingDevice.relX));
      newHeight = Math.max(0.04, Math.min(newHeight, 1 - resizingDevice.relY));
      
      setDevices(devices.map(d => 
        d.id === resizingDevice.id 
          ? { ...d, relWidth: newWidth, relHeight: newHeight }
          : d
      ));
    } else if (draggedDevice) {
      let newX = (pos.x - dragOffset.x) / canvas.width;
      let newY = (pos.y - dragOffset.y) / canvas.height;
      
      // Constrain to canvas bounds
      newX = Math.max(0, Math.min(newX, 1 - draggedDevice.relWidth));
      newY = Math.max(0, Math.min(newY, 1 - draggedDevice.relHeight));
      
      setDevices(devices.map(d => 
        d.id === draggedDevice.id 
          ? { ...d, relX: newX, relY: newY }
          : d
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedDevice(null);
    setResizingDevice(null);
  };

  // Save positions (in real app, send to backend)
  const savePositions = () => {
    const saveData = {
      imageDimensions: imageDimensions,
      devices: devices,
      timestamp: new Date().toISOString()
    };
    
    console.log('Saving device positions:', saveData);
    
    // Simulate API save
    localStorage.setItem('devicePositions', JSON.stringify(saveData));
    alert('Device positions saved successfully! Positions are stored relative to image dimensions and will be consistent across all devices.');
  };

  // Load saved positions on mount
  useEffect(() => {
    const saved = localStorage.getItem('devicePositions');
    if (saved) {
      const data = JSON.parse(saved);
      // Only restore if image dimensions match (optional validation)
      setDevices(data.devices || []);
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Password Section */}
      <div style={styles.passwordSection}>
        <h3 style={styles.sectionTitle}>Authentication</h3>
        <div style={styles.passwordInputGroup}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.passwordInput}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
          />
          <button onClick={handlePasswordSubmit} style={styles.button}>
            OK
          </button>
        </div>
        {passwordError && <span style={styles.errorText}>{passwordError}</span>}
        {isAuthenticated && <span style={styles.successText}>✓ Authenticated</span>}
      </div>

      {/* Device Selection - Only shown when authenticated */}
      {isAuthenticated && (
        <div style={styles.deviceSection}>
          <h3 style={styles.sectionTitle}>Add Devices</h3>
          <div style={styles.deviceControls}>
            <select
              value={selectedDeviceType}
              onChange={(e) => setSelectedDeviceType(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a device...</option>
              {deviceTypes.map(device => (
                <option key={device.id} value={device.id}>
                  {device.icon} {device.name}
                </option>
              ))}
            </select>
            <button 
              onClick={addDevice} 
              disabled={!selectedDeviceType}
              style={selectedDeviceType ? styles.button : styles.buttonDisabled}
            >
              Add to Canvas
            </button>
          </div>
        </div>
      )}

      {/* Image Upload Section */}
      <div style={styles.uploadSection}>
        <h3 style={styles.sectionTitle}>Upload Floor Plan</h3>
        <div style={styles.uploadControls}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.fileInput}
          />
          <button onClick={fetchImageFromAPI} style={styles.button}>
            Load from API
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef} 
        style={styles.canvasContainer}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            ...styles.canvas,
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        />
        
        {!backgroundImage && (
          <div style={styles.placeholder}>
            <p>Upload an image to start placing devices</p>
          </div>
        )}
      </div>

      {/* Save Button */}
      {devices.length > 0 && (
        <div style={styles.saveSection}>
          <button onClick={savePositions} style={styles.saveButton}>
            💾 Save All Positions
          </button>
          <p style={styles.hint}>
            Positions are saved relative to image dimensions ({imageDimensions.width}×{imageDimensions.height}px).
            Cards will appear in the exact same relative positions on any screen size.
          </p>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.instructions}>
        <h4>How to use:</h4>
        <ul style={styles.instructionList}>
          <li>Enter password <strong>1234</strong> to enable device placement</li>
          <li>Upload a floor plan image or load from API</li>
          <li>Select a device type and click "Add to Canvas"</li>
          <li><strong>Drag</strong> cards to move them anywhere on the image</li>
          <li><strong>Drag bottom-right corner</strong> to resize cards</li>
          <li>Click <strong>×</strong> to remove a device</li>
          <li>Click <strong>Save</strong> to persist positions (stored as % of image)</li>
        </ul>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  passwordSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '18px',
    fontWeight: '600'
  },
  passwordInputGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  passwordInput: {
    padding: '10px 15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    width: '200px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)'
    }
  },
  buttonDisabled: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontSize: '16px'
  },
  errorText: {
    color: '#f44336',
    marginLeft: '10px',
    fontSize: '14px'
  },
  successText: {
    color: '#4CAF50',
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: '600'
  },
  deviceSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  deviceControls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  select: {
    padding: '10px 15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    minWidth: '200px',
    outline: 'none',
    cursor: 'pointer'
  },
  uploadSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  uploadControls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  fileInput: {
    padding: '10px',
    border: '2px dashed #ddd',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  canvasContainer: {
    position: 'relative',
    width: '100%',
    height: '600px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px'
  },
  canvas: {
    display: 'block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  placeholder: {
    position: 'absolute',
    color: '#999',
    fontSize: '18px',
    textAlign: 'center'
  },
  saveSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  saveButton: {
    padding: '15px 40px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  hint: {
    color: '#666',
    fontSize: '14px',
    marginTop: '10px',
    fontStyle: 'italic'
  },
  instructions: {
    backgroundColor: '#fff3cd',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #ffeaa7'
  },
  instructionList: {
    margin: '10px 0',
    paddingLeft: '20px',
    color: '#856404',
    lineHeight: '1.8'
  }
};

export default DevicePlacementSystem;